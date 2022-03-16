pipeline {
    agent any

    environment{
        SLACK_CHANNEL = 'pipeline-todolist'
    }

    options{
        timeout(time: 3, unit: 'MINUTES')
    }

    stages {

        stage('Notifies start') {
            steps {
                 slackSend(message: "Tests started", channel: "#${env.SLACK_CHANNEL}")
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

        stage('Deploy'){
            steps{
                echo 'Deployng...'
            }
        }
    }
}