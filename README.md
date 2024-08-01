#### NEXTJS-NEXTAUTH-AMAZON-COGNITO-AMPLIFY-CDK

##### Next-Auth 
- Install Next-Auth for Session management `npm install next-auth`
#### AWS Cognito
- Install AWS Identity manager SDK to connect to the frontend`npm install amazon-cognito-identity-js`
##### AWS Login
- Set up your AWS SSO `aws configure sso` then add a SSO start URL and Region.
- Test out the configurations with AWS s3 `aws s3 ls --profile IacTest`
- NOTE: Provide the account information to bootstrap the cloudformation environment if not listed `cdk bootstrap aws://135980944300//REGION`
- Configure your aws sso login through the AWS CONSOLE or CLI `aws sso login --profile NAME`

#### AWS-Amplify-CDK
##### Useful commands
The `cdk.json` file tells the CDK Toolkit how to execute your app.
It is a [Maven](https://maven.apache.org/) based project, so you can open this project with any Maven compatible Java IDE to build and run tests.

 * `mvn package`     compile and run tests
 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation
 NOTE: Create a GITHUB personal token for AWS amplify hosting with permissions for `admin hook`
 - Navigate to AWS Secret Manager and store the personal token`other type of secret`,`Plaintext` and `Secret Name and Save`
 - Pass the created key from AWS Secret Manager - ID to the oauthToken `SecretValue`.`secretsManager()`
