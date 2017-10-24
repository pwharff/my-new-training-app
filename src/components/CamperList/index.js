import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Header, Menu, Container, Table, Button, Image} from 'semantic-ui-react'

/*

const getSortedCards = createSelector(getCards, cards =>
  [...cards].sort(function compare(card1, card2) {
    if (card1.cardholderName < card2.cardholderName) {
      return -1
    }
    if (card1.cardholderName > card2.cardholderName) {
      return 1
    }
    // a must be equal to b
    return 0
  }),
)
 */
export class CamperList extends Component{
  state = {campers:[]}
  async componentDidMount(){
    const promis = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')//fetch is normally async
    const myResults = await promis.json()
    myResults.sort(function compare(card1, card2){
      if (card1.alltime < card2.alltime) {
        return 1
      }
      if (card1.alltime > card2.alltime) {
        return -1
      }
      // a must be equal to b
      return 0
    }).reverse().reverse()
    this.setState({campers:myResults})
    console.log(myResults);
  }
  render(){
    const {campers} = this.state

    return(
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Employee</Table.HeaderCell>
            <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
            <Table.HeaderCell>FooBar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {campers.map((campers) => {
              return <Table.Row key={campers.username}>
                <Table.Cell>
                  <Header as='h4' image>
                    <Image src={campers.img} shape='rounded' size='mini' />
                    <Header.Content>
                      {campers.username}
                      <Header.Subheader>{campers.lastUpdate}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  {campers.alltime}
                </Table.Cell>
              </Table.Row>
            }
          )

          }

        </Table.Body>
      </Table>

        /*
        *
        * alltime
        img
        lastUpdate
        recent
        username*/
    )
  }
}



