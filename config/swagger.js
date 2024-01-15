const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokedex API',
      description: 'API endpoints for a pokedex and pokemon generaton services documented on swagger',
      contact: {
        name: 'Eric Coimbra',
        email: 'info@miniblog.com',
        url: 'https://www.linkedin.com/in/eric-coimbra/',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5005/',
        description: 'Local server',
      },
      {
        url: '<your live url here>',
        description: 'Live server',
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
};

module.exports = options;
