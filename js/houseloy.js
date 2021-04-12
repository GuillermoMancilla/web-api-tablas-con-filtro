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

    const tercerPag = new Vue({
        el:'#app',
        data:{
            members: null,
            loadingM: true,
            titulo:"Party Loyalty",
            text1: "hose who consider themselves to be strong partisans, strong Democrats and strong Republicans respectively, tend to be the most faithful in voting for their party's nominee for office and legislation that backs their party's agenda.",
            tabla: "House at a glance",
            r1:"Democrats",
            r2:"Republicans",
            r3:"Independents",
            tl:"Total",
            estadistica: []
      
        },
        created () {
            this.getData();
        },
        methods: {
        
            async getData() {
                let url = `https://api.propublica.org/congress/v1/113/house/members.json`
                const response = await fetch(url, 
                    {
                        headers: {
                        "X-API-Key": "dSuOEdU6VWhYWW2Uu3WcyQDVrtPjf2sAH4U5Y5nB"
                        }
                    }
                )
                const responseJson = await response.json();
                const members = await responseJson.results[0].members;
                this.members = await members;
                this.loadingM = false;
                if(response.status === 200){
                $(document).ready(function() {
                    $('#example').DataTable();
                    $('#example2').DataTable( {
                        "scrollY":        "200px",
                        "scrollCollapse": true,
                        "paging":         false
                    } );
                    $('#example3').DataTable( {
                        "scrollY":        "200px",
                        "scrollCollapse": true,
                        "paging":         false
                    } );
                } );
                
            }
    
                let demo = 0;
                let repu = 0;
                let ind = 0;
                let sumarepu = 0;
                let sumademo = 0;
                let sumaind = 0;
                let orden1 = [];
                let orden2 = [];
                let array2 = [];
                let array1 = [];
                let cantidad = 0;
                let miembrosVotosParty = 0;
                let votoD = 0;
                let votoR = 0;
                let votoI = 0;
                let votosDe = 0;
                let votosIn = 0;
                let votosRe = 0;
                let porR = 0;
                let porD = 0;
                let porI = 0;
                
                for (let i = 0; i < members.length; i++) {
                    const e = members[i];
                    
                    miembrosVotosParty = miembrosVotosParty + e.total_votes;
                    cantidad = members.length ;
                    
                   if(e.party == 'R'){
                      repu = repu + 1;
                      sumarepu =    sumarepu + e.votes_with_party_pct ;
                      votoR = votoR + e.total_votes;
                   }else if(e.party == 'D'){
                       demo = demo + 1;
                       sumademo = sumademo + e.votes_with_party_pct ;
                       votoD = votoD + e.total_votes;
                   }else if(e.party == 'ID'){
                       ind = ind + 1;
                       sumaind = sumaind + e.votes_with_party_pct ;
                       votoI = votoI + e.total_votes;
                   }
                
                
                }
                
                let totalRepu  = (sumarepu/ repu); 
                    // totalRepu = totalRepu.toFixed(2);
                let totalDemo = (sumademo/ demo); 
                    // totalDemo = totalDemo.toFixed(2);
                let totalInd = (sumaind/ ind); 
                 totalInd = parseInt(totalInd) || 0;
                    // totalInd = totalInd.toFixed(2);
                let totalT = (miembrosVotosParty/ cantidad); 
                 totalT = totalT.toFixed(2);
                 votosDe = Math.round((votoD * totalDemo) /100);
                 votosIn = Math.round((votoI * totalInd) /100);
                 votosRe = Math.round((votoR * totalRepu) /100);
                 let votosTotales = votosDe + votosIn + votosRe;
                 porD = (votosDe * 100) / votosTotales;
                 porD = porD.toFixed(2);
                 porI = (votosIn * 100) / votosTotales;
                 porI = porI.toFixed(2);
                 porR = (votosRe * 100) / votosTotales;
                 porR = porR.toFixed(2);
                
                //  console.log( totalInd)
                 orden1 = members.sort( (a,b) =>  a.votes_with_party_pct - b.votes_with_party_pct)
                 for (let i = 0; i < orden1.length * 0.1; i++) {
                         const e = orden1[i];
                         array1.push(e)
                 }
                 orden2 = members.sort( (a,b) =>  b.votes_with_party_pct - a.votes_with_party_pct)
                 for (let i = 0; i < orden2.length * 0.1; i++) {
                         const e = orden2[i];
                         array2.push(e)
                 }
                 console.log(array2)
    
                this.estadistica.push({
                    republicanos:repu,
                    democratas:demo,
                    independiente:ind,
                    totalRepublicanos: totalRepu,
                    totalDemocratas:totalDemo,
                    totalInd:totalInd,
                    cant: cantidad,
                    totalt:totalT,
                    porcD: porD,
                    porcI:porI,
                    porcR:porR,
                    array1,
                    array2
                
                
                });
                 return this.estadistica;
        
            }
        }
    })