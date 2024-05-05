// Import the framework and instantiate it
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

const ORIGINAL_SERVER = "https://jsonplaceholder.typicode.com";

const getData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    fastify.log.error(error);
    return {
      message: "Error something went wrong",
    };
  }
};

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

fastify.get("/posts/:id?", async (request, reply) => {
  if (request.params.id) {
    return getData(`${ORIGINAL_SERVER}/posts//${request.params.id}`);
  } else {
    return getData(`${ORIGINAL_SERVER}/posts`);
  }
});

fastify.get("/posts/:id/comments", async (request, reply) => {
  return getData(`${ORIGINAL_SERVER}/posts//${request.params.id}/comments`);
});
fastify.get("/comments", async (request, reply) => {
  if (request.query.postId) {
    return getData(
      `${ORIGINAL_SERVER}/comments?postId=${request.query.postId}`
    );
  } else {
    return getData(`${ORIGINAL_SERVER}/comments`);
  }
});
fastify.get("/albums", async (request, reply) => {
  return getData(`${ORIGINAL_SERVER}/albums`);
});
fastify.get("/todos", async (request, reply) => {
  return getData(`${ORIGINAL_SERVER}/todos`);
});
fastify.get("/users", async (request, reply) => {
  return getData(`${ORIGINAL_SERVER}/users`);
});

const PORT=process.env.PORT || 80
// Run the server!
try {
  await fastify.listen({ port: PORT, host:"0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
