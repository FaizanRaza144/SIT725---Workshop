import { expect } from "chai";
import fetch from "node-fetch";

describe("Add Two Numbers", function() {
    const url = "http://localhost:8080/addTwoNumbers/3/5";

    it("returns status 200 to check if API works", async function() {
        const response = await fetch(url);
        expect(response.status).to.equal(200);
    });

    it("returns statusCode key in body to check if API gives the right result (should be 200)", async function() {
        const response = await fetch(url);
        const body = await response.json();
        expect(body.statusCode).to.equal(200);
    });

    it("returns the result as a number", async function() {
        const response = await fetch(url);
        const body = await response.json();
        expect(body.result).to.be.a('number');
    });

    it("returns the result equal to 8", async function() {
        const response = await fetch(url);
        const body = await response.json();
        expect(body.result).to.equal(8);
    });

    it("returns the result not equal to 15", async function() {
        const response = await fetch(url);
        const body = await response.json();
        expect(body.result).to.not.equal(15);
    });
});

describe("Add Two Strings", function() {
    const url = "http://localhost:8080/addTwoNumbers/a/b";

    it("should return status 400 for invalid inputs", async function() {
        const response = await fetch(url);
        expect(response.status).to.equal(400);  
    });
    

    it("returns statusCode key in body to check if API gives the right result (should be 400)", async function() {
        const response = await fetch(url);
        const body = await response.json();
        expect(body.statusCode).to.equal(400);
    });

    it("returns the result as null", async function() {
        const response = await fetch(url);
        const body = await response.json();
        expect(body.result).to.be.null;
    });
});

describe("Get Projects", function() {
    const url = "http://localhost:8080/api/projects";

    it("should return status 200 or 404", async function() {
        const response = await fetch(url);
        expect([200, 404]).to.include(response.status);  
    });

    it("returns the result as an array if status is 200", async function() {
        const response = await fetch(url);
        if (response.status === 200) {
            const body = await response.json();
            expect(body).to.be.an('array');
        } else {
            this.skip(); 
        }
    });
});

