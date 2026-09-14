/*
------Before reading this code pls get some idea about this from readme.md------

I've build a basic prototype in typescript for better mental model
   - Created a function scanLineForSignatures which will take two argument 
   (first is for code and another is number of line). 

*/



import patterns from "./patterns.json" with {type: 'json'} // nodenext requires {type: 'json'} for JSON import

interface Finding {
    ruleId: string; 
    ruleName: string; 
    severity: string; 
    line: number; 
    column: number; 
    match: string; 
}


 function scanLineForSignatures(line: string, lineNumber: number): Finding[] {
  const findings: Finding[] = [];

  for (const rule of patterns) {
    const re = new RegExp(rule.regex, rule.flags); //new RegExp(...) this is the constructor function 
    //it build living search tool out of regular text string. 

    let match: RegExpExecArray | null; // RegExpExecArray is a specialized array returned by the re.exec(line) when a successful match is found..

    while ((match = re.exec(line)) !== null) {
      findings.push({
        ruleId: rule.id,
        ruleName: rule.name,
        severity: rule.severity,
        line: lineNumber,
        column: match.index + 1,
        match: match[0],
      });
    }
  }

  return findings;

}


const result = scanLineForSignatures("const key = 'AKIA123IURHASBFAISDF';", 1);
console.log(result);
