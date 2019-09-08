import { AbstractOutput } from './AbstractOutput'

class BasicOutput implements AbstractOutput {
  result: any
  path: any
  workDir: any

  constructor (path: string, workDir: string) {
    this.workDir = workDir
    this.path = path
  }

  buildContent () {
    return this.result
  }

  output () {
    return
  }
}

export default BasicOutput
