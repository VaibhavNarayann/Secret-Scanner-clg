## Storytime

Suppose you're using an **AWS S3 bucket**, a **paid database**, and store a **JWT secret** in your project — which is pretty normal to do based on your project requirements. Simply, you've put sensitive keys/info into your **.env** file and then use it from there.

What if you forgot to put those sensitive keys in **.env** and used them directly in your codebase?
- Probably it will happen, right? Ahh, a simple human error can lead to **millions of dollars** in losses...

---

### Let me explain the solution in simple words!!

So my service will allow you to put your **codebase/repo link from GitHub**, and based on your codebase, it will detect **sensitive/secret keys** like **AWS keys**, **database keys**, etc., and return to you that **line of code**.
        
