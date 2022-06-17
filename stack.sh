#!/bin/bash

if [ "$#" -lt 4 ]; then
    echo 'usage: stack.sh [--create | --update | --changeset | --delete] templatefile.yaml parameterfile.json [profile]'
    exit
fi
option=$1
templatefile=$2
parameterfile=$3
profile=${4:-default}
region=us-west-2

if [ ! -f $parameterfile ]; then
    echo $parameterfile does not exist
    exit
fi

if [ ! -f $templatefile ]; then
    echo $templatefile does not exist
    exit
fi

stackname=$(echo "$parameterfile" | awk -F"-parameter.json" '{print $1}')

echo "DEBUG: stackname: ${stackname}"

if [ "$option" == "--create" ]; then
    echo "Creating stack..."
    aws cloudformation create-stack \
        --profile $profile \
        --stack-name ${stackname} \
        --disable-rollback \
        --template-body file://$templatefile \
        --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM"  \
        --region $region \
        --parameters file://$parameterfile
fi

if [ "$option" == "--update" ]; then
    echo "Attempting to locate stack: "${stackname}
    status=$(aws cloudformation describe-stacks \
        --profile $profile \
        --stack-name ${stackname} \
        --region $region 2>/dev/null)
    if [ ! -z "$status" ]; then
        echo $status
    else
        echo "ERROR: stack does not exist"
        exit
    fi

    echo "Updating stack..."
    aws cloudformation update-stack \
        --profile $profile \
        --stack-name ${stackname} \
        --template-body file://$templatefile \
        --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM"  \
        --region $region \
        --parameters file://$parameterfile
fi

if [ "$option" == "--changeset" ]; then
    echo "Attempting to locate stack: "${stackname}
    status=$(aws cloudformation describe-stacks \
        --profile $profile \
        --stack-name ${stackname} \
        --region $region 2>/dev/null)
    if [ ! -z "$status" ]; then
        echo $status
    else
        echo "ERROR: stack does not exist"
        exit
    fi

    echo "Creating changeset..."
    aws cloudformation create-change-set \
        --profile $profile \
        --stack-name ${stackname} \
        --change-set-name ${stackname}-changeset-1 \
        --template-body file://$templatefile \
        --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM"  \
        --region $region \
        --parameters file://$parameterfile
fi

if [ "$option" == "--delete" ]; then
    echo "Deleting stack..."
    aws cloudformation delete-stack \
           --profile $profile \
           --stack-name ${stackname} \
           --region $region 2>/dev/null
fi