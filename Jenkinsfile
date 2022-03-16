pipeline {
  agent { node { label 'linux && node14' }}
  
  stages {

    stage('Build') {
      steps {
        echo "Building the application"
        steps {
        sh "npm i"
        }
      }
    }

    stage('Executa testes') {
      steps {
        echo 'rodar os teste'
        sh "npm run test:smoke"
      }
    }
  }
}