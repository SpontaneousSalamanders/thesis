import { GET_MENTORS } from '../actions/mentorActions.jsx';
import { intersection } from 'lodash';

const MENTORS = [
    {name: 'Beth Johnson', location: 'SF', techStack: ['React', 'Express', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/xEUUtut.jpg'},
    {name: 'Benji Marinacci', location: 'Redwood City', techStack: ['React', 'Express', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/iwn6mV5.jpg'},
    {name: 'Fred Zirdung', location: 'SF', techStack: ['React', 'Express', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/9awfsn2.jpg'},
    {name: 'Eric Brown', location: 'Albany', techStack: ['React', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/adDa5JU.jpg'},
    {name: 'Tyler Arbus', location: 'Toronto', techStack: ['Angular', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/ohFukM2.jpg'},
    {name: 'Paul Mills', location: 'SF', techStack: ['React', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/9eJRSav.jpg'},
    {name: 'Alison Zhang', location: 'Palo Alto', techStack: ['React', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/uz1C3om.jpg'},
    {name: 'Jong Kim', location: 'San Jose', techStack: ['React', 'Node.js', 'JavaScript'], picture: 'http://imgur.com/yTpcGqk.jpg'},
]
export default function(state = [], action) {
  switch (action.type) {
    case GET_MENTORS:
    return state.concat(action.payload.data);
  }
  return state;
}

export default function(state = MENTORS, action = {}) {
    const { type } = action;
    switch (type) {
        case 'FILTER_MENTORS':
            const { techStacks, roles, locations } = action.payload;
            if (techStacks.includes('All')) {
                return MENTORS;
            }
            return MENTORS.filter((mentor) => {
                const matchingTechStacks = intersection(techStacks, mentor.techStack);
                return matchingTechStacks.length > 0 && matchingTechStacks.length === techStacks.length
            })
        default:
            return state;
    };
}
