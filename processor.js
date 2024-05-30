module.exports = {
  addRandomPoll: addRandomPoll,
  choosePoll: choosePoll,
  choosePollOption: choosePollOption
};

pollTitles = [
  "What's your favorite color?",
  "What's your favorite food?",
  "What's your favorite animal?",
  "What's your favorite movie?",
  "What's your favorite book?",
  "What's your favorite song?",
  "What's your favorite band?",
  "What's your favorite TV show?",
  "What's your favorite video game?",
  "What's your favorite sport?"
];

pollOptions = [
  ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Black", "White"],
  ["Pizza", "Burgers", "Tacos", "Sushi", "Pasta", "Steak", "Salad", "Soup"],
  ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Turtle", "Hamster", "Snake"],
  ["Star Wars", "Harry Potter", "Lord of the Rings", "The Matrix", "The Godfather", "The Shawshank Redemption", "The Dark Knight", "Inception"],
  ["1984", "To Kill a Mockingbird", "The Great Gatsby", "Pride and Prejudice", "The Catcher in the Rye"],
  ["Bohemian Rhapsody", "Stairway to Heaven", "Imagine", "Smells Like Teen Spirit", "Hotel California", "Hey Jude", "Like a Rolling Stone", "Purple Haze"],
  ["The Beatles", "Led Zeppelin", "Pink Floyd", "Queen", "The Rolling Stones", "The Who", "The Doors", "Nirvana"],
  ["Game of Thrones", "Breaking Bad", "The Sopranos", "The Wire", "Friends", "The Office", "Seinfeld", "The Simpsons"],
  ["The Legend of Zelda", "Super Mario Bros.", "World of Warcraft", "Minecraft", "Fortnite", "Call of Duty", "Grand Theft Auto", "Halo"],
  ["Football", "Basketball", "Baseball", "Soccer", "Hockey", "Golf", "Tennis", "Boxing"]
];

function addRandomPoll(requestParams, _context, _ee, next) {
  const randomIndex = Math.floor(Math.random() * pollTitles.length);
  const title = pollTitles[randomIndex];
  const options = pollOptions[randomIndex];
  const poll = {
    title: title,
    options: options
  };
  requestParams.json = poll;
  return next();
}

function choosePoll(_req, res, context, _events, done) {
  var polls;
  try {
    polls = JSON.parse(res.body)
  } catch {
    return done();
  }
  if (polls === undefined || polls.polls === undefined) {
    return done();
  }
  polls = polls.polls;

  const pollsAmount = polls.length;
  if (pollsAmount === 0) {
    return done();
  }
  const selectedPollPos = Math.floor(Math.random() * pollsAmount);
  const poll = polls[selectedPollPos];
  context.vars.selectedPollId = poll.id;
  return done();
}

function choosePollOption(_req, res, context, _events, done) {
  var poll;
  try {
    poll = JSON.parse(res.body);
  } catch {
    return done();
  }
  
  if (poll === undefined || poll.options === undefined) {
    return done();
  }
  const optionsAmount = poll.options.length;
  const selectedOptionPos = Math.floor(Math.random() * optionsAmount);
  context.vars.selectedOption = selectedOptionPos;
  return done();
}