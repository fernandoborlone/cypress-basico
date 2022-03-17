pipeline {
    agent any

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
                slackSend(color: '#BDFFC3', message: "Start Build: ${env.BUILD_URL} started", channel: "#${env.SLACK_CHANNEL}")
            }
        }

        stage('Get Stage'){
            steps{
                script{
                    env.ENVIRONMENT ""

                    if(env.GIT_BRANCH ==~ /.*pipeline/){
                        env.ENVIRONMENT = "pipeline"
                    }else if(env.GIT_BRANCH ==~ /.main/){
                        env.ENVIRONMENT = "main"
                    }else{
                        currentBuild.result = 'ABORTED'
                        error('Pipe nao roda para outras branches. Necessário implementar')
                    }
                }
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