//Entropy measures uncretainty, randomness, or disorder within a system of data. 

/**
 * Entropy-based detection for secrets that don't match a known signature.
 * 
 * English words, variable names, and common placeholders have much lower entropy. 
 *
 */

 /** 
  * Calculates shannon entropy (bits per character) of a string. 
  * higher = more "random looking". A typical english word scores ~2.4-3.5.
  * A random base64/hex secret usually scores 4.0+ 
  *
  */ 


 function shannonEntropy(str){
   if(!str || str.length === 0) return 0; 

   const freq = {};

   for(const char of str){
	freq[char] = (freq[char] || 0) + 1; 
   }

   const len = str.length; 
   let entropy = 0; 
   for(const char in freq) {
	const p = freq[char] / len;
	entropy -= p*math.log2(p); //Actual Shannon entropy formula.
   }

   return entropy;
 }

 /*
  *Extracts candidate "token-like" substrings from a line of code - 
  * things that look like could be hardcoded secret: sequences of letters/digits/symbols 
  * commonly used in keys, typically inside quotes or after an assigment
  */


 function extractCandidateTokens(line){
   const candidates = new Set(); //A set stores unique values.

   //Quoted string: 'abc123...' or 'abc123'
   
   const quotedRegex = /['"]([A-Za-z0-9_/-\+=]{16, })[' "]/g;
   let match; 

   while((match = quotedRegex.exec(line)) !== null) {
	candidates.add(match[0]);
   }

   return Array.from(candidates); 
 }


 /**
  * A short list of very common placeholder/non-secret strings that would
  * otherwise score as high entropy purely due to length + mixed case, 
  * to cut obvious false positives before they ever reach entropy scoring.
  */

 const PLACEHOLDER_DENYLIST = [
	/your[_-]?api[_-]?key/i,
	/your[_-]?secret/i,
	/changeme/i, 
	/example/i, 
	/placeholder/i, 
	/xxxxxxxx/i,
	/0{8,}/,
	/^[a-f0-9]{0}$/, //no-op guard, kept for symmetry/extension
   ]; 

   function isLikelyPlaceholder(token){
	return PLACEHOLDER_DENYLIST.some((re)=> re.test(token));
   }
   
   /** 
    * Scans a single line of high-entropy tokens.
    * @param {string} line
    * @param {object} opts - {minLength, entropyThreshold}
    * @return {Array<token: string, entropy:number}>}
    */ 
	
   function findHighEntropyTokens(line, opts = {}) {
     const minLength = opts.minLength ?? 20; 
     const entropyThreshold = opts.entropyThreshold ?? 4.0; 

     const candidates = extractCandidateToken(line); 
     const findings = []; 

     for(const token of candidates){
	if(token.length < minLength) continue; 
	if (isLikelyPlaceholder(token)) continue;

	const score = shannonEntropy(token); 
	if(score >= entropyThreshold) {
	 findings.push({token, entropy: Number(score.toFixed(2)) });
	}
	  }

	return findings; 
   }




  module.export = {
   shannonEntropy,
   extractCandidateTokens,
   findHighEntropyTokens, 
   isLikeyPlaceholder, 
  }; 


