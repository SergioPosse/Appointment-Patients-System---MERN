describe("visit localhost", function(){

    it("just visit the localhost:PORT", function(){

        cy.request("GET", "http://localhost:666/medical-care-rioiv/turns").as("turns");

        cy.get("@turns").should((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response).to.have.length.of.at.least(1);
            expect(response.headers['content-type']).to.eq('json');
        });
    })
})
