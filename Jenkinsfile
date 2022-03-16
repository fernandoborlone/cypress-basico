pipeline {
    agent any

    stages {
        stage('Dependencies'){
            steps{
                sh 'npm i'
            }
        }

        stage('Build'){
            sh 'npm run build'
        }

        stage('Smoke Tests'){
            sh'npm run test:smoke'
        }

        stage('All the tests but smoke'){
            sh'npm run test:allButSmoke'
        }

        stage('Deploy'){
            echo 'Deployng...'
        }
    }
}