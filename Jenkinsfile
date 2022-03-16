pipeline {
  agent { node { label 'linux && node14' }}
  
 stages {
        stage('Dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Smoke Tests') {
            steps {
                sh 'npm run test:smoke:'
            }
        }
        stage('All the tests but smoke') {
            steps {
                sh 'npm run test:allButSmoke'
            }
        }
        stage('Deploy') {
        steps {
      echo 'Deploying....'
    }
  }
}