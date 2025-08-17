
**Assessment 1 (Total Marks **20**)**

Assignment: **Software requirements analysis and design (**Full-Stack CRUD Application Development with DevOps Practices**)**


2.	Project Design
2.1 Requirement Diagram using SysML

 <img width="940" height="996" alt="image" src="https://github.com/user-attachments/assets/b833f72e-06f9-4cc8-8b1b-39c98e3548db" />




The diagram justifies a Safety Monitoring System that is practical for a construction site by tying. At the core are functional capabilities that workers and supervisors actually need in the field: self-service signup and secure login so only verified people access data; incident logging to capture what happened, severity, cause, and corrective actions; equipment compliance tracking to prevent failures from expired certificates or missed inspections; reporting so supervisors can see open items and trends; and audit logging to preserve who changed what and when. These are constrained by non-functional requirements that make the product usable and trustworthy in real conditions: usability for fast, mobile data entry; performance so dashboards load quickly; security with server-side validation and protected storage; and data retention so incidents and hazards are kept for the required period without keeping everything forever. Relationships such as “authentication” and “storage with DB” show where security and retention must be enforced, while test cases verify the most critical behaviors.

2.2 Block Definition Diagram using SysML

 <img width="940" height="408" alt="image" src="https://github.com/user-attachments/assets/ed595778-ece2-4e2b-b914-89ceb6451fd5" />

First, a person creates an account (Signup) and then signs in (Login) so only approved users can use the app. Once signed in, they can do two main jobs: record what happened (Incident Logging with severity, cause and actions) and keep gear up to date (Equipment Compliance Tracking inspections, certificates and status). All of this is saved in a central database and the server checks every request (Security / server-side validation), so bad or fake data can’t slip in. The system then turns those records into Reports so the team can see what’s open today and spot trends. In the background, Audit logging records who created or changed each item and when, so there’s a clear trail for reviews or investigations. Finally, the hazard validation test case confirms that when hazards are logged, the app captures the specific details needed on the site plans proof that the process really works in the field.
2.3 Parametric Diagram using SysML

 <img width="940" height="409" alt="image" src="https://github.com/user-attachments/assets/79e34883-3c51-428b-89b1-e8e96a6af7a4" />


Workers first sign up and log in to the system. Once they're in, they can report safety incidents (like accidents or near-misses), track whether equipment is properly maintained and certified, and see what safety issues their teammates are reporting. The system keeps detailed records of everything - what happened, how serious it was, what caused it, and what steps were taken to fix it. Managers can then run reports to see patterns and make sure all safety issues are being properly addressed. Everything is stored securely in a database, and the system has built-in security features to protect sensitive safety information. It's essentially a one-stop digital platform that makes workplace safety management more organized, transparent, and accountable.
3.	Project Management (JIRA) 
3.1 Provide a public link of the Jira Board or project link

https://connect-team-xpu59edq.atlassian.net/jira/software/projects/CSSMS/boards/34/backlog?atlOrigin=eyJpIjoiYWY3OGY3Yzg0OTY4NDFjMWE5Zjc1M2IwYjg4NjNlOWMiLCJwIjoiaiJ9

3.2 Product Backlog Screenshot
 <img width="940" height="452" alt="image" src="https://github.com/user-attachments/assets/f1177474-3d23-481d-87f6-f0ecba9c50cb" />

3.3 Project Timeline Screenshot (Include Epic, User Story)
 <img width="940" height="408" alt="image" src="https://github.com/user-attachments/assets/7c1f30c3-dba6-4c27-8c94-4fe26c7b9ff2" />

 <img width="940" height="504" alt="image" src="https://github.com/user-attachments/assets/932111ce-66d3-49ef-8bb0-e9e71a4c6048" />

3.4 Provide Screenshot for any one of User Stories, including subtasks
<img width="940" height="489" alt="image" src="https://github.com/user-attachments/assets/a2ed6203-943d-416a-a9e7-fc9bfd0ced22" />


 
3.5 Provide a Screenshot of where you planned all sprints
 <img width="940" height="505" alt="image" src="https://github.com/user-attachments/assets/81f5dccd-115d-44f9-884a-1afccc82585e" />

3.6 Provide a Screenshot of a sprint that you started but did not complete yet
 <img width="940" height="509" alt="image" src="https://github.com/user-attachments/assets/7825aa19-f713-4dca-827c-a576c395ce23" />

3.7 Provide a Screenshot of complete Jira Board after starting your first sprint 
 <img width="940" height="494" alt="image" src="https://github.com/user-attachments/assets/59f56a95-d5f3-48ea-ade7-1ba7b29ceefb" />

3.8 Provide a Screenshot of completed sprint
<img width="940" height="458" alt="image" src="https://github.com/user-attachments/assets/0e90e501-531c-4ce2-ba05-31b0b3a223e2" />

 <img width="940" height="496" alt="image" src="https://github.com/user-attachments/assets/3456fc75-1d2d-4f17-8b7c-2c2540b96264" />


 

4.	Backend Development, Frontend Development, GitHub Version Control & Branching Strategy
http://3.106.229.80/

https://github.com/Yashcshah/Construction-Site-Safety-Monitoring-System


5.	CI/CD Pipeline Setup
5.1 Provide workflow file (YML) screenshot
<img width="940" height="408" alt="image" src="https://github.com/user-attachments/assets/5efd0283-d15c-4922-b01d-6bafb099f539" />

 

5.2 Provide a screenshot of Test Case Results with a pass/fail status (from the terminal output)
 <img width="940" height="646" alt="image" src="https://github.com/user-attachments/assets/41295dfc-9323-495f-835b-82eab45548f3" />

5.3 Provide a screenshot of your GitHub Action Configuration 		(Include runner, environments, and prod variables setup)
 
<img width="940" height="418" alt="image" src="https://github.com/user-attachments/assets/2e802bec-1ce3-42d3-87bb-deaf535929c3" />
<img width="940" height="344" alt="image" src="https://github.com/user-attachments/assets/595b5874-057a-4598-916f-481ba2b9f813" />
<img width="940" height="486" alt="image" src="https://github.com/user-attachments/assets/fedcec40-a0a8-4377-a4ac-9b64e76774c7" />

 
 
5.4 Provide a screenshot of EC2 server configuration (Only include pm2 status output table from the terminal)
 <img width="940" height="77" alt="image" src="https://github.com/user-attachments/assets/bf692573-271a-430b-9ebc-5eeba86934ca" />
<img width="940" height="98" alt="image" src="https://github.com/user-attachments/assets/2543fb6e-1b61-4661-a561-567eff757296" />

 

5.5 Provide a screenshot of the “Run Test” page from GitHub (	where the job is running, and you can see the steps are passing 	or failing)
<img width="940" height="94" alt="image" src="https://github.com/user-attachments/assets/05c54825-c282-4254-a90b-2e573601b075" />

 
