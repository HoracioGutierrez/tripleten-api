import { assertEquals } from "@std/assert";
import { handler } from "./src/server.ts";


Deno.test(function statusCodeIs200() {
  const serverResponse = handler()
  const expectedResponse = new Response("Hello World!");
  assertEquals(serverResponse.status, expectedResponse.status);
});

Deno.test(function responseIsHelloWorld() {
  const serverResponse = handler()
  const expectedResponse = new Response("Hello World!");

  const checkResponse = async () => {
    const serverBody = await serverResponse.text();
    const expectedBody = await expectedResponse.text();
    assertEquals(serverBody, expectedBody);
  }

  checkResponse();
});