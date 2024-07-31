package com.myorg;

import software.amazon.awscdk.*;
import software.amazon.awscdk.services.amplify.alpha.App;
import software.amazon.awscdk.services.amplify.alpha.GitHubSourceCodeProvider;
import software.amazon.awscdk.services.amplify.alpha.Platform;
import software.amazon.awscdk.services.codebuild.BuildSpec;
import software.amazon.awscdk.services.cognito.*;
import software.constructs.Construct;

import java.util.LinkedHashMap;
import java.util.Map;
// import software.amazon.awscdk.Duration;
// import software.amazon.awscdk.services.sqs.Queue;

public class AwsCdkStack extends Stack {
    public AwsCdkStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public AwsCdkStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        UserPool userPool = UserPool.Builder.create(this, "next-userpool")
                .userPoolName("next-userpool")
                .removalPolicy(RemovalPolicy.DESTROY)
                .signInAliases(SignInAliases.builder()
                        .email(true)
                        .build())
                .selfSignUpEnabled(true)
                .autoVerify(AutoVerifiedAttrs.builder()
                        .email(true)
                        .build())
                .userVerification(UserVerificationConfig.builder()
                        .emailSubject("Please verify your demo email")
                        .emailBody("Thanks for your registration! Your code is {####}")
                        .emailStyle(VerificationEmailStyle.CODE)
                        .build())
                .standardAttributes(StandardAttributes.builder()
                        .email(StandardAttribute.builder()
                                .required(true)
                                .mutable(true)
                                .build())
                        .familyName(StandardAttribute.builder()
                                .required(false)
                                .mutable(false)
                                .build())
                        .build())
                .customAttributes( Map.of(
                        "created_at", new DateTimeAttribute()
                ))
                .build();

        UserPoolClient client = userPool.addClient("next-userpooolclient", UserPoolClientOptions.builder()
                        .userPoolClientName("next-userpoolclient")
                        .generateSecret(false)
                        .authFlows(AuthFlow.builder()
                                .userSrp(true)
                                .userPassword(true)
                                .build())
                .build());

        userPool.addDomain("lawrencejewsdomain", UserPoolDomainOptions.builder()
                        .cognitoDomain(CognitoDomainOptions.builder()
                                .domainPrefix("lawrencejewsdomain")
                                .build())
                .build());

        CfnOutput.Builder.create(this, "COGNITO_ID").value(userPool.getUserPoolId()).build();
        CfnOutput.Builder.create(this, "COGNITO_CLIENT_ID").value(client.getUserPoolClientId()).build();
        // issue URL

        App amplifyApp = App.Builder.create(this, "demo-amplify-hosting")
                .appName("demo-amplify-hosting")
                .sourceCodeProvider(GitHubSourceCodeProvider
                        .Builder
                        .create()
                        .owner("lawrencejews")
                        .repository("nextjs-next-auth-aws-cognito-amplify")
                        .oauthToken(SecretValue.secretsManager("demo-amplify-hosting"))
                        .build())
                .autoBranchDeletion(true)
                .platform(Platform.WEB_COMPUTE) // Set to web compute if SSR
                .buildSpec(BuildSpec.fromObjectToYaml(
                        new LinkedHashMap<>(){{
                            put("version", "1.0");
                        }}
                ))
                .build();
    }
}
