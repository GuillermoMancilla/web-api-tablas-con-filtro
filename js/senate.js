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
          titulo:"Senators",
          text1: "First convened in 1789, the composition and powers of the Senate are established in Article One of the U.S. Constitution. Each state is represented by two senators, regardless of population, who serve staggered six-year terms. The Senate has several exclusive powers not granted to the House, including consenting to treaties as a precondition to their ratification and consenting to or confirming appointments of Cabinet secretaries, federal judges, other federal executive officials, military officers, regulatory officials, ambassadors, and other federal uniformed officers, as well as trial of federal officials impeached by the House."
         
      }
  },
  methods:{
      getSenate: function(){
          const headers = { "X-API-Key": "dSuOEdU6VWhYWW2Uu3WcyQDVrtPjf2sAH4U5Y5nB" };
          this.$http.get("https://api.propublica.org/congress/v1/113/senate/members.json", { headers })
          .then(function(response){
              if(response.status === 200) {
                  this.list = response.data.results;
                  $(document).ready(function() {
                    $('#example').DataTable();
                  } );

                  

                  this.list = response.data.results.map(p => {
                      console.log(p.members.length);
                      for(let x = 0;x < p.members.length; x++){
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