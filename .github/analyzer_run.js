const fs = require('fs');
const path = require('path')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

fetch('https://raw.githubusercontent.com/CiscoSecurity/sxo-05-security-workflows/Main/docs/assets/scripts/analyzer.js')
  .then(response => response.text())
  .then(data => {
    eval(data+'');
    let repo = process.argv[2]
    let failed_issues = {}
    let warnings = {}
    let successes = {}
    fs.readdirSync(repo).forEach(file => {
        // console.log(file);
        let wf_name = file
        file = path.join(repo,file)
        if(fs.statSync(file).isDirectory()){
            // if(file.split('\\')[7].includes('.git') || file.includes('node_modules')){
            if(file.includes('.git') || file.includes('node_modules')){
                return
            }
            fs.readdirSync(file).forEach(innerFile => {
                wf_name = wf_name + '/' + innerFile
                innerFile = path.join(file,innerFile)
                console.log(innerFile);
                var wf = fs.readFileSync(innerFile, 'utf-8')
                
                if(wf.includes('!#NOANALYZER')){
                    return
                }

                failed_issues[wf_name] = Array()
                warnings[wf_name] = Array()
                successes[wf_name] = Array()
                let analyzed = analyzeWorkflow(wf)
                // console.log(analyzed)

                for (const key in analyzed['response']['details']) {
                    analyzed['response']['details'][key].forEach(element => {
                        if(element['type'] == 'error'){
                            // console.log()
                            failed_issues[wf_name].push(element)
                        }
                        if(element['type'] == 'success'){
                            // console.log()
                            successes[wf_name].push(element)
                        }
                        if(element['type'] == 'warning'){
                            // console.log()
                            warnings[wf_name].push(element)
                        }
                    });
                }

                if(failed_issues[wf_name].length == 0){
                    delete failed_issues[wf_name]
                }
                if(successes[wf_name].length == 0){
                    delete successes[wf_name]
                }
                if(warnings[wf_name].length == 0){
                    delete warnings[wf_name]
                }
              });
            //   console.log(failed_issues)
        }
        // else if(fs.statSync(file).isFile() && (file.includes('package-lock') || file.includes('.git') || file.includes('test.json'))){
        //     var wf = fs.readFileSync(file, 'utf-8')
        
        //     let analyzed = analyzeWorkflow(wf)
        //     console.log(analyzed)
        // }
      });

      fs.writeFile(path.join(".github","failed_issues.json"), JSON.stringify(failed_issues), function(err) {
        if (err) {
            console.log(err);
        }
    });
      fs.writeFile(path.join(".github","warnings.json"), JSON.stringify(warnings), function(err) {
        if (err) {
            console.log(err);
        }
    });
      fs.writeFile(path.join(".github","successes.json"), JSON.stringify(successes), function(err) {
        if (err) {
            console.log(err);
        }
    });

      console.log()
  })
  .catch(err => console.error(err))
