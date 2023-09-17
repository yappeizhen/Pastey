# Snippet Sharing Service

## Objective

Build a Snippet Sharing Service (like pastey.com).

You are a Software Engineer working in a fictitious company. You have just been tasked to create a Minimal Viable Product (MVP) of "a clone of Pastey for anonymous users".

Pastey is often described as an online content sharing service. It allows users to store and share plain text snippets or code snippets easily. Users can paste their desired content into the platform, and it generates a unique URL for the paste, which can be shared with others. This URL can then be used to access and view the shared content.

As the sole Software Engineer assigned to build this service, you are responsible for designing, implementing and deploying said service.

## Requirements

Implement a Snippet Sharing Service that provides the following functionalities:

1. Snippet Creation

   Users should be able to create a new snippet (text / code) by entering the content and submitting it.

   - A snippet should consist of a title and its contents.
   - The snippet should respect formatting entered by the user (eg. whitespace, new lines).
   - The snippet should be assigned a unique URL. It should be automatically generated.

2. Snippet Retrieval

   Users should be able to access a snippet by entering its unique URL and view the stored content.

3. Snippet Views and Statistics

   Track and display the number of views for each snippet. Each time a snippet is accessed, its view counter is incremented by 1.

4. Snippet Listing

   Users should be able to view a list of all snippets. Users should be able to sort by most recent snippets (default) or by most number of views. There should be either infinite scrolling or pagination for every 10 snippets listed.

5. Persistence

   Implement storage for the snippets using a database to ensure that the created snippets and their respective metadata are stored and retrievable.

6. Snippet Expiration

   Automatically remove snippets from being readable after a specified period (in minutes after creation) to simulate an expiration policy. You may decide whether the snippet contents are deleted from the database.

Your solution must include a backend, database, and a front-end website. The website should have an interface for creating, listing and accessing snippets. It should include input fields for content, along with appropriate buttons for submission and retrieval where appropriate.

### Good to Haves

- Document noteworthy implementation details, as well as the justifications for the decisions that were made.
- Documentation for APIs and endpoints implemented
- Front-end with good UI/UX

### Example Interaction Flow

1. User chooses to create a new snippet.
2. User enters the title, snippet contents, and expiry (eg. 5 minutes).
3. User submits the snippet, and is provided with a unique URL.
4. User views list of snippets, sorted by most recent snippets.
5. After 10 snippets in the list, user is either required to scroll further (infinite scrolling) or click on the next page (pagination).
6. User views list of snippets, sorted by most viewed.
7. User visits the unique URL provided earlier. User is able to see the title, contents, view count and time left to expiry (if applicable) of the snippet.
8. User refreshes the snippet page, incrementing the view count by 1.
9. After 5 minutes, user refreshes the snippet page. The snippet is no longer viewable.

## Frequently Asked Questions

Q: Must I implement a REST API for the required features?

A: No, you are not restricted to RESTful APIs. You may choose to implement the backend in any way you deem feasible, be it REST, GraphQL or others.

---

Q: What format must the generated unique URL be in?

A: You are to evaluate and decide a suitable format for the generated URLs.

---

Q: Must the front-end look like Pastey?

A: No, you are to implement a sensible front-end based on the specified requirements, preferably with good UI/UX.

---

Q: Can I use web frontend frameworks?

A: Yes, you may choose any front-end framework that you are comfortable with. You are not required to implement front-end components from scratch.

---

Q: Will implementing additional features help in my evaluation?

A: You are only required to implement features listed in the requirements section. Additional features outside of those listed in the "Optional Features" section (eg. user accounts, additional sorting options, etc.) will not be considered in your evaluation.

---
