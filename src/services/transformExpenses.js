/*
{
    "Type": "Sale",
    "Trans Date": "06/15/2017",
    "Post Date": "06/15/2017",
    "Description": "SFMTA MOSCONE GARAGE",
    "Amount": -2
  }
*/
const trasformExpenses = data => (
    data.map(d => {
        const { Description } = d;
            return{
                Description,
                Amount: (d.Amount < 0) ? -d.Amount : d.Amount
                }
        }
        )
    )
    


export default trasformExpenses