pipeline {
    agent any

    stages {
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