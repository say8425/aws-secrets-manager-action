# AWS Secrets Manager Actions

[![npm version](https://img.shields.io/npm/v/aws-secrets-manager-actions?color=cb3837&logo=npm)](https://www.npmjs.com/package/aws-secrets-manager-actions)
[![GitHub Actions Test](https://github.com/say8425/aws-secrets-manager-actions/workflows/Test/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3ATest)
[![GitHub Actions Publish](https://github.com/say8425/aws-secrets-manager-actions/workflows/Publish/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3APublish)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/say8425/aws-secrets-manager-actions/blob/master/LICENSE)

This GitHub Action helps you define your secrets that stored in [AWS Secrets Manager](https://aws.amazon.com/secrets-manager)  to environment values.

## Usage

```yaml
steps:
 - name: Store ENV from AWS SecretManager
   uses: say8425/aws-secrets-manager-actions@v2
   with:
     AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
     AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
     AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
     SECRET_NAME: ${{ secrets.SECRET_NAME }}
     OUTPUT_PATH: '.env' # optional
```

Add your AWS IAM keys and you secret name that you want to use from your AWS Secrets Manager secrets list.
Then your secrets will be defined environment values.

### AWS IAM

You need [AWS IAM](https://aws.amazon.com/iam) user that has proper policy to access AWS Secrets Manager. 
If you have it, then add this IAM user keys at `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and region `AWS_DEFAULT_REGION`.
But we greatly recommend to store these keys at [GitHub Secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets).

#### Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "secretsmanager:GetSecretValue",
            "Resource": "*"
        }
    ]
}
```

If you need policy example, then feel free to use this above policy.
And you can get more information at [AWS User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_identity-based-policies.html#permissions_grant-get-secret-value-to-one-secret).

### Secret Name

Add you want to use secret name from your AWS Secrets Manager secrets list.
You can use only one secret name.

### Environment Values

Your secrets will be environment values.
And these environment values are masked with `***`. So never be revealed.

#### Raw string values

Most of the secrets are can be parsed.
But some case, parsing can be failed, like invalid json.
In this case, this unparsed raw sting will be stored in `asm_secret` env key.  

### Export environment variables to file

You can export these environment variables to file with `OUTPUT_PATH` input parameter.
When you define `OUTPUT_PATH`, then action create a file named as you defined.
And environments will be exported into this file.   

## Contributing

Your Contributions are always welcome!
Feel free to check [issues](https://github.com/say8425/aws-secrets-manager-action/issues)
or [Pull Requests](https://github.com/say8425/aws-secrets-manager-actions/pulls)

## License

This project is [MIT](https://github.com/say8425/aws-secrets-manager-action/blob/master/LICENSE) licensed.
