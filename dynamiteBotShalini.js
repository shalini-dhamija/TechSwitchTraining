class Bot {
    makeMove(gamestate) {
        let result = 'R'
        let previousP1States =[]
        let previousP2States =[]
        let RCountOpponent = 0
        let PCountOpponent = 0
        let SCountOpponent = 0
        let DCountOpponent = 0
        let WCountOpponent = 0
        let Dcount = 0

        //Play dynamite for first 10 times
        if (gamestate.rounds.length === 0)
            result='D'
        else{
            for (let i = 0; i<gamestate.rounds.length;i++){
                previousP2States.push(gamestate.rounds[i]['p2'])
                previousP1States.push(gamestate.rounds[i]['p1'])
                if(gamestate.rounds[i]['p2'] === 'R')
                    RCountOpponent +=1
                if(gamestate.rounds[i]['p2'] === 'P')
                    PCountOpponent +=1
                if(gamestate.rounds[i]['p2'] === 'S')
                    SCountOpponent +=1
                if(gamestate.rounds[i]['p2'] === 'D')
                    DCountOpponent +=1
                if(gamestate.rounds[i]['p2'] === 'W')
                    WCountOpponent +=1
                //Check how many times previously we have used D
                if(gamestate.rounds[i]['p1'] === 'D')
                    Dcount += 1

            }
            
            //If other player is playing 'R' most of the times, play 'P'or'D'
            if(RCountOpponent>PCountOpponent && RCountOpponent>SCountOpponent && RCountOpponent>DCountOpponent && RCountOpponent>WCountOpponent )
                if(Dcount<100)
                    result = 'PD'.charAt(Math.floor(Math.random() * 2))
                else
                    result = 'P'
            //If other player is playing 'P' most of the times, play 'S'or'D'
            if(PCountOpponent>RCountOpponent && PCountOpponent>SCountOpponent && PCountOpponent>DCountOpponent && PCountOpponent>WCountOpponent )
                if(Dcount<100)
                    result = 'SD'.charAt(Math.floor(Math.random() * 2))
                else
                    result = 'S'

            //If other player is playing 'S' most of the times, play 'R'or'D'
            if(SCountOpponent>PCountOpponent && SCountOpponent>RCountOpponent && SCountOpponent>DCountOpponent && SCountOpponent>WCountOpponent )
                if(Dcount<100)
                    result = 'RD'.charAt(Math.floor(Math.random() * 2))
                else
                    result = 'R'

            //If other player is playing 'D' most of the times, play 'W'
            if(DCountOpponent>PCountOpponent && DCountOpponent>SCountOpponent && DCountOpponent>RCountOpponent && DCountOpponent>WCountOpponent )
                result = 'W'

            //If other player is playing 'W' most of the times, play 'RPS' randomly
            if(WCountOpponent>PCountOpponent && WCountOpponent>SCountOpponent && WCountOpponent>DCountOpponent && WCountOpponent>RCountOpponent )
                result = 'RPS'.charAt(Math.floor(Math.random() * 3))          
            
                
        }
       
        return result
    }
}

module.exports = new Bot();
