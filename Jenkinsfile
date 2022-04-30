def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']


pipeline {
    agent any

    triggers{
        // uma vez a cada duas horas entre 9h e 17h todos os dias da semana (talvez às 10h38, 12h38, 14h38, 16h38)
        cron('H H(9-16)/2 * * 1-5')

        // Consultar periodicamente o SCM?
        pollSCM '* * * * *'

    }

    environment{
        PROJECT_NAME = "Cypress-basico-integracao-jenkins"
        VERSION = "0.0.1"
        SLACK_CHANNEL = 'pipeline-jenkins'
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


        stage('Install Dependencies'){
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
        always {

            slackSend channel: "#${env.SLACK_CHANNEL}",
            color: COLOR_MAP[currentBuild.currentResult],
            message: "*${currentBuild.currentResult}:* Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'\n *More info at:* ${env.BUILD_URL}"
            
        }
    }   
}