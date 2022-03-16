pipeline {
  agent { node { label 'linux && node14' }}
  
  options {
    ansiColor('xterm')
  }

  stages {

    stage('Build') {
      echo "Building the application"
      steps {
      sh "npm i"
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