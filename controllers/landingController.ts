import type { Context } from "https://deno.land/x/oak@v17.1.0/mod.ts";

const landingController = (ctx: Context) => {
  ctx.response.type = "text/html";
  ctx.response.body = `
    <h1>Tripleten REST API</h1>
    <p>This is a REST API for Tripleten Web Development Course. You can use the following endpoints:</p>
    <ul>
      <li>
        <span>GET - </span>
        <a href="/api/users">/api/users</a>
        <span> - Get all users</span>
      </li>
      <li>
        <span>GET - </span>
        <a href="/api/users/1">/api/users/:id</a>
        <span> - Get user with a specific id</span>
      </li>
    </ul>
  `;
}

export default landingController;