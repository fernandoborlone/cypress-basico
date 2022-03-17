pipeline {
    agent any

    environment{
        PROJECT_NAME = "Cypress-basico-integracao-jenkins"
        VERSION = "0.0.1"
        SLACK_CHANNEL = 'pipeline-todolist'
    }

    options{
        timeout(time: 3, unit: 'MINUTES')
    }

    
    stages {

        stage('Notifies start') {
            steps {
                slackSend(color: '#BDFFC3', message: "Tests referring to the build: ${env.BUILD_URL} started", channel: "#${env.SLACK_CHANNEL}")
            }
        }

        stage('Dependencies'){
            steps{
                sh 'npm i'
            }
        }

        stage('Smoke Tests'){
            steps{
                sh'npm run test:smoke'
            }
        }

        stage('All the tests but smoke'){
            steps{
                sh'npm run test:allButSmoke'
            }
        }

        stage('Notifies Finish') {
            steps {
                slackSend(color: '#BDFFC3', message: "Tests referring to the build: ${env.BUILD_URL} finish", channel: "#${env.SLACK_CHANNEL}")
            }
        }
    }
}