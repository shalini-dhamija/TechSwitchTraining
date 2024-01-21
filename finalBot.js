class Bot {
    makeMove(gamestate) {
        let result='R';
        let previousp2States =[]
        let previousP1state=[]
        let lastWin = false
        let last2Win = false
        let previousRCount = 0
        let previousPCount = 0
        let previousSCount = 0
        let previousDCount = 0
        let previousWCount = 0
        let Dcount = 0

        if (gamestate.rounds.length == 0)
            result = 'D'
        else{
            for(let i = 0; i<gamestate.rounds.length;i++){
                previousp2States.push(gamestate.rounds[i]['p2'])
                previousP1state.push(gamestate.rounds[i]['p1'])
                if(gamestate.rounds[i]['p2'] == 'R')
                    previousRCount +=1
                if(gamestate.rounds[i]['p2'] == 'P')
                    previousPCount +=1
                if(gamestate.rounds[i]['p2'] == 'S')
                    previousSCount +=1
                if(gamestate.rounds[i]['p2'] == 'D')
                    previousDCount +=1
                if(gamestate.rounds[i]['p2'] == 'W')
                    previousWCount +=1
                //Check how many times previously we have used D
                if(gamestate.rounds[i]['p1'] == 'D')
                    Dcount += 1
            }

            lastWin = this.checkWin(previousP1state[previousP1state.length -1],previousp2States[previousp2States.length -1])
            last2Win = this.checkWin(previousP1state[previousP1state.length -2],previousp2States[previousp2States.length -2])
            
            if(lastWin && last2Win){
                if(previousp2States[previousp2States.length-1]==='P' || previousp2States[previousp2States.length-2] === 'P' )
                if(Dcount<100)
                result = 'D'
                else
                result = 'S'
               if(previousp2States[previousp2States.length-1]==='R' || previousp2States[previousp2States.length-2] === 'R' )
               result = 'P'
               if(previousp2States[previousp2States.length-1]==='S' || previousp2States[previousp2States.length-2] === 'S' )
               result = 'R'
               if(previousp2States[previousp2States.length-1]==='D' || previousp2States[previousp2States.length-2] === 'D' )
               result = 'W'
               if(previousp2States[previousp2States.length-1]==='W' || previousp2States[previousp2States.length-2] === 'W' )
               result='S'
            }   
            
            
            else if(lastWin && !last2Win)
            {                      
            if(previousP1state[previousP1state.length-1] === 'R')
            result = 'S'
            if(previousP1state[previousP1state.length-1] === 'S')
            result = 'P'
            if(previousP1state[previousP1state.length-1] === 'P')
            result = 'R'
            if(previousP1state[previousP1state.length-1] === 'D')
            result = 'P'
            if(previousP1state[previousP1state.length-1] === 'W')
            if(Dcount<100)
                result = 'D'
            else
                result = 'R'
        }
        else{
            //If other player is playing 'R' most of the times, play 'P'
            if(previousRCount>previousPCount && previousRCount>previousSCount && previousRCount>previousDCount && previousRCount>previousWCount )
            if(Dcount<100)
                result = 'PD'.charAt(Math.floor(Math.random() * 2))
            else
                result = 'P'
            //If other player is playing 'P' most of the times, play 'S'
            if(previousPCount>previousRCount && previousPCount>previousSCount && previousPCount>previousDCount && previousPCount>previousWCount )
            if(Dcount<100)
                result = 'SD'.charAt(Math.floor(Math.random() * 2))
            else
                result = 'S'

            //If other player is playing 'S' most of the times, play 'R'
            if(previousSCount>previousPCount && previousSCount>previousRCount && previousSCount>previousDCount && previousSCount>previousWCount )
            if(Dcount<100)
                result = 'RD'.charAt(Math.floor(Math.random() * 2))
            else
                result = 'R'

            //If other player is playing 'D' most of the times, play 'W'
            if(previousDCount>previousPCount && previousDCount>previousSCount && previousDCount>previousRCount && previousDCount>previousWCount )
            result = 'W'

            //If other player is playing 'W' most of the times, play 'R'
            if(previousWCount>previousPCount && previousWCount>previousSCount && previousWCount>previousDCount && previousWCount>previousRCount )
            result = 'RPS'.charAt(Math.floor(Math.random() * 3))
            
        }
        }
          return result
}

 checkWin(p1State, p2State){
    if((p1State==='R' && p2State === 'S') 
                    || (p1State==='R' && p2State === 'W')
                    || (p1State==='S' && p2State === 'P')
                    || (p1State==='S' && p2State === 'W')
                    || (p1State==='P' && p2State === 'R')
                    || (p1State==='P' && p2State === 'W')
                    || (p1State==='D' && p2State === 'R')
                    || (p1State==='D' && p2State === 'P')
                    || (p1State==='D' && p2State=== 'S')
                    || (p1State==='W' && p2State === 'D'))
                    return true
    else
        return false

}
}

module.exports = new Bot();
