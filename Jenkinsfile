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
                 slackSend(color: '#87CEFA', message: "Tests started", channel: "#${env.SLACK_CHANNEL}")
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

        post {
            success {
                slackSend(color: '#32CD32', message: "Success in QA test execution in build", channel: "#${env.SLACK_CHANNEL}")
             }

        aborted {
            slackSend(color: '#fa9f47', message: "Aborted in QA test execution in build", channel: "#${env.SLACK_CHANNEL}")
             }

        failure {
            slackSend(color: '#FF0000', message: "Failure in QA test execution, check errors in build", channel: "#${env.SLACK_CHANNEL}")
            }
        }
    }
}