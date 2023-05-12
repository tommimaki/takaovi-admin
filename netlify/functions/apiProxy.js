const axios = require("axios");

const FormData = require("form-data");
const Busboy = require("busboy");

function parseMultipartForm(event) {
  return new Promise((resolve) => {
    const fields = { image: [] };
    const bb = Busboy({ headers: event.headers });

    bb.on("file", (name, file, info) => {
      const { filename, mimeType } = info;

      file.on("data", (data) => {
        if (!fields[name]) fields[name] = [];

        fields[name].push({
          filename,
          type: mimeType,
          content: data,
        });
      });
    });

    bb.on("finish", () => {
      resolve(fields);
    });

    bb.end(Buffer.from(event.body, "base64"));
  });
}

exports.handler = async function (event, context) {
  const { path, httpMethod, headers, body } = event;
  console.log("new function");
  console.log("method", httpMethod);
  // console.log("body", body);
  console.log("path", path);

  const apiPath = path.replace("/.netlify/functions/apiProxy", "");
  const apiUrl = `${process.env.NEXT_PUBLIC_AWS_IP}${apiPath}`;
  console.log("apipath", apiPath);
  console.log("apiUrl", apiUrl);
  try {
    let response;

    if (httpMethod === "GET") {
      response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (httpMethod === "POST") {
      if (headers["content-type"].startsWith("multipart/form-data")) {
        const fields = await parseMultipartForm(event);
        console.log("Fields:", fields);
        const file = fields.file[0];
        const formData = new FormData();
        formData.append("file", file.content, file.filename);

        response = await axios.post(apiUrl, formData, {
          headers: formData.getHeaders(),
        });
      } else {
        response = await axios.post(apiUrl, JSON.parse(body), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } else if (httpMethod === "PUT") {
      response = await axios.put(apiUrl, JSON.parse(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (httpMethod === "PATCH") {
      response = await axios.patch(apiUrl, JSON.parse(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (httpMethod === "DELETE") {
      response = await axios.delete(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      throw new Error(`Unsupported HTTP method: ${httpMethod}`);
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
