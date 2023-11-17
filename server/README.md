# Deployment

Deployment is managed via [GCP App Engine](https://cloud.google.com/appengine/docs/standard/python3/runtime).
For python web servers, it requires an `app.yaml` (deployment configs), `requirements.txt` (dependencies), and a 
`main.py` (entry point) at a minimum. 

For custom deployment settings, e.x. launch args, we can specify a custom entrypoint
with [gunicorn CLI args](https://docs.gunicorn.org/en/stable/settings.html#settings) environment variable or via a 
[config file](https://docs.gunicorn.org/en/stable/settings.html#config-file). Alternatively, we can pass
runtime environment variables to the container instead of cmd line args via 
[env_vars option](https://github.com/google-github-actions/deploy-appengine#inputs) during deploy step.

We also have the option of [deploying manually via CLI](https://cloud.google.com/sdk/gcloud/reference/app/deploy). 
Just cd to server directory and run `gcloud app deploy`. You will need to auth and specify the project/account to use.