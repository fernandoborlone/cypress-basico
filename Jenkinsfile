pipeline {
    agent any

    triggers{
            cron('H H(9-16)/2 * * 1-5')
    }

    environment{
        PROJECT_NAME = "Cypress-basico-integracao-jenkins"
        VERSION = "0.0.1"
        SLACK_CHANNEL = 'pipeline-todolist'
    }

    options{
        timeout(time: 1, unit: 'HOURS')
    }

    
    stages {

        stage('Slack Message - START') {
            steps {
                slackSend(color: '#BDFFC3', message: "Start Build: ${env.BUILD_URL}", channel: "#${env.SLACK_CHANNEL}")
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
    }

    post {
        success {
            slackSend(color: '#BDFFC3', message: "Testes Finalizado com SUCCESSO: ${env.BUILD_URL}", channel: "#${env.SLACK_CHANNEL}")
        }
        failure {
            slackSend(color: '#FF9FA1', message: "Testes FALHARAM. Verifique o que ocorreu no Terminal: ${env.BUILD_URL}", channel: "#${env.SLACK_CHANNEL}")
        }
    }  
}