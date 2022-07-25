import L from 'leaflet';
import person from './image/person.png'
import warning from './image/warning.png'
import approved from './image/approved.png'
import question from './image/question.png'
const iconHome = L.icon({
  iconUrl: person,
  iconSize:     [38, 50], // size of the icon
});

const iconWarning = L.icon({
  iconUrl: warning,
  iconSize:     [38, 50], // size of the icon
});

const iconApproved = L.icon({
  iconUrl: approved,
  iconSize:     [38, 50], // size of the icon
});

const iconQuestion = L.icon({
  iconUrl: question,
  iconSize:     [38, 50], // size of the icon
});

export { iconHome, iconApproved, iconQuestion, iconWarning};