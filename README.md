# LanceDB AWS S3 Connection Test

This project demonstrates connecting to LanceDB using AWS S3 as the object store backend.

## Prerequisites

- Node.js (version 22 LTS preferred)
- AWS credentials configured
- Access to an S3 bucket

## Setup

1. **Ensure Node.js is installed:**
   
   Check if Node.js is installed:
   ```bash
   node --version
   ```
   
   If not installed, download and install from [nodejs.org](https://nodejs.org/)

2. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update S3 bucket path:**
   
   Edit `aws.js` and replace `<BUCKET_NAME>` with your actual S3 bucket name:
   ```javascript
   const S3_PATH = "s3://your-bucket-name/test/coderabbit/data"
   ```

## Required AWS Permissions

Your AWS credentials need the following S3 permissions for the specified bucket:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
              "s3:PutObject",
              "s3:GetObject",
              "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::<bucket>/<prefix>/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation"
            ],
            "Resource": "arn:aws:s3:::<bucket>",
            "Condition": {
                "StringLike": {
                    "s3:prefix": [
                        "<prefix>/*"
                    ]
                }
            }
        }
    ]
}
```
## Running the Script

```bash
node aws.js
```
