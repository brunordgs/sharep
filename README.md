<h1>
  <a href="https://sharep.vercel.app" target="_blank">
    sharep.vercel.app
  </a>
</h1>

Sharep was created to share great and useful products to our community.

## Getting started

Make sure you have installed:

- [Node](https://nodejs.org)
- [Pnpm](https://pnpm.io)
- [Docker](https://docker.com)

You'll need these items installed on your machine in order to build the app.

```bash
$ git clone https://github.com/<your-username>/sharep.git
$ cd sharep
$ pnpm install
```

Set up Supabase database

```bash
# You must create an account in the Supabase and generate an access token in order to proceed.
$ pnpm supabase login
$ pnpm supabase start

# NOTE: In case of the tables don't show up, you can run:
$ pnpm supabase db reset
```

Finally, run application

```bash
$ pnpm dev
```

Open `http://localhost:3000` with your browser to see the web result and `http://localhost:54321` to check the database.

\_Obs: don't forget to create the `.env.local` (please duplicate `.env.example`). **Application won't work correctly without it**.

## Contributing

The repository is currently under development. If you want to contribute, please fork the repository, make the changes as you'd like and submit your pull request.

## License

[MIT License](./LICENSE)
