pipeline {
    agent any

    options{
        timeout(time: 3, unit: 'MINUTES')
    }

    
    stages {

        stage('Notifies start') {
            steps {
                echo 'Slack-test'
                slackSend(message: "Tests referring to the build started")
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