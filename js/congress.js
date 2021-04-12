const $dropdown = $(".dropdown");
const $dropdownToggle = $(".dropdown-toggle");
const $dropdownMenu = $(".dropdown-menu");
const showClass = "show";
    
    $(window).on("load resize", function() {
      if (this.matchMedia("(min-width: 768px)").matches) {
        $dropdown.hover(
          function() {
            const $this = $(this);
            $this.addClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "true");
            $this.find($dropdownMenu).addClass(showClass);
          },
          function() {
            const $this = $(this);
            $this.removeClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "false");
            $this.find($dropdownMenu).removeClass(showClass);
          }
        );
      } else {
        $dropdown.off("mouseenter mouseleave");
      }
});

new Vue({
  el: '#app',
  created: function(){
      this.getSenate()

      
  },

  data(){
      
      return {
          list:[],
          otraLista : [],
          titulo:"Congressmen",
          text1: "The major power of the House is to pass federal legislation that affects the entire country, although its bills must also be passed by the Senate and further agreed to by the U.S. President before becoming law (unless both the House and Senate re-pass the legislation with a two-thirds majority in each chamber). The House has some exclusive powers: the power to initiate revenue bills, to impeach officials (impeached officials are subsequently tried in the Senate), and to elect the U.S. President in case there is no majority in the Electoral College.",
          text2: "Each U.S. state is represented in the House in proportion to its population as measured in the census, but every state is entitled to at least one representative."
      }
  },
  methods:{
      getSenate: function(){
          const headers = { "X-API-Key": "dSuOEdU6VWhYWW2Uu3WcyQDVrtPjf2sAH4U5Y5nB" };
          this.$http.get("https://api.propublica.org/congress/v1/113/house/members.json", { headers })
          .then(function(response){
              if(response.status === 200) {
                  this.list = response.data.results;
                  $(document).ready(function() {
                    $('#example').DataTable();
                  } );

                  

                  this.list = response.data.results.map(p => {
                      console.log(p.members.length);
                      for(let x = 0;x < 100; x++){
                          this.otraLista.push({
                              "name": p.members[x].first_name + " " + p.members[x].last_name,
                              "party": p.members[x].party,
                              "state": p.members[x].state,
                              "years": p.members[x].seniority,
                              "votewp": p.members[x].votes_with_party_pct,
                              "url": p.members[x].url

                          })
                      }
                      return this.otraLista;
                  })
              } 
          }).catch(error => {
              console.console(error)
          })
                  
          
      }
  },
});