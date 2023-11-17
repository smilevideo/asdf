import { useState, useEffect, useRef } from 'react'
import './App.css'
import PlayerSettings from './components/PlayerSettings';

import styled from 'styled-components';

import { WEBTRANSPORT_SERVER_URL, GAME_HEIGHT, GAME_WIDTH } from './utilities/constants';

const Container = styled.div`
  margin-top: 20px;

  visibility: ${props => props.hidden ? 'hidden' : 'visible'};
`

const Canvas = styled.canvas`
  height: ${props => `${props.height}px`};
  width: ${props => `${props.width}px`};

  background-color: black;

  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 0;
`

function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerColor, setPlayerColor] = useState("#FFFFFF");
  const [connectionReady, setConnectionReady] = useState(false);

  const webTransportConnectionRef = useRef<null | WebTransport>(null);
  const writerRef = useRef<null | WritableStreamDefaultWriter>(null);
  const readerRef = useRef<null | ReadableStreamDefaultReader>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    const connect = async () => {
      webTransportConnectionRef.current = new WebTransport(WEBTRANSPORT_SERVER_URL);
      await webTransportConnectionRef.current.ready;
      writerRef.current = webTransportConnectionRef.current.datagrams.writable.getWriter();
      readerRef.current = webTransportConnectionRef.current.datagrams.readable.getReader();
      setConnectionReady(true);
    }
    connect();
  }, []);

  useEffect(() => {
    if (connectionReady) {
      const readFromConnection = async () => {
        const decoder = new TextDecoder();

        while (true && readerRef.current) {
          const { value, done } = await readerRef.current.read();
          if (done) {
            break;
          }
          
          const decodedValue = JSON.parse(decoder.decode(value))
          const { position, color } = decodedValue;

          const canvas = canvasRef.current
          const context = canvas?.getContext('2d');
      
          if (!context) return;
    
          context.fillStyle = color;
          context.fillRect(position.x, position.y, 1, 1);
        }
      }
      readFromConnection();
    }
  }, [connectionReady])

  useEffect(() => {
    const canvas = canvasRef.current
    
    if (!canvas) return;

    const encoder = new TextEncoder();

    const getCursorPosition = (canvas: HTMLCanvasElement, event: MouseEvent) => {
      const rectangle = canvas.getBoundingClientRect();
      const x = event.clientX - rectangle.left;
      const y = event.clientY - rectangle.top;
      return ({x, y});
    };

    const sendPositionAndColor = (position: object, color: string) => {
      const rawData = JSON.stringify({
        position, 
        color
      });
      const data = encoder.encode(rawData);

      if (writerRef.current) {
        writerRef.current.write(data);
      }
    };

    const onMouseEvent = (event: MouseEvent) => {
      const flags = event.buttons !== undefined ? event.buttons : event.which;
      const leftClickHeld = (flags & 1) === 1;

      if (leftClickHeld) {
        const position = getCursorPosition(canvas, event);
        sendPositionAndColor(position, playerColor);
      }
    };

    canvas?.addEventListener('mousedown', onMouseEvent);
    canvas?.addEventListener('mousemove', onMouseEvent);
    canvas?.addEventListener('mouseup', onMouseEvent);

    return () => {
      canvas?.removeEventListener('mousedown', onMouseEvent);
      canvas?.removeEventListener('mousemove', onMouseEvent);
      canvas?.removeEventListener('mouseup', onMouseEvent);
    }
  }, [playerColor]);

  return (
    <>
      <PlayerSettings
        playerName={playerName}
        setPlayerName={setPlayerName}
        playerColor={playerColor}
        setPlayerColor={setPlayerColor}
      />
  
      <Container hidden={!connectionReady}>
        <div>{playerName || "No name Entered"}</div>
        <div>{playerColor}</div>
        <Canvas ref={canvasRef} height={GAME_HEIGHT} width={GAME_WIDTH}/>
      </Container>      

      {!connectionReady && 
        <div>No connection to the server.</div>
      }
    </>
  )
}

export default App
