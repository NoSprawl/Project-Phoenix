#pragma link "uuid"

#include "gwan.h"
#include <string.h>
#include <stdlib.h>
#include <uuid/uuid.h>

int main(int argc, char *argv[]) {
  xbuf_t *response = get_reply(argv);
  char header[] = "Content-type: application/json\r\n";
  http_header(1, header, sizeof(header) - 1, argv);
  char *raw_payload = (char*)argv[0];

  // Explore not using deep searches
  jsn_t *envelope = jsn_frtext(raw_payload, "user");
  jsn_free(envelope);
  jsn_t *unwrapped = jsn_byname(envelope, "user", 1);
  jsn_free(unwrapped);
  jsn_t *username = jsn_byname(unwrapped, "username", 1);
  jsn_t *password = jsn_byname(unwrapped, "password", 1);

  xbuf_t decoded;
  xbuf_init(&decoded);

  jsn_totext(&decoded, username, 0);
  char *decoded_username = malloc(decoded.len);
  xbuf_pull(&decoded, decoded_username, decoded.len);
  decoded_username++;
  decoded_username[strlen(decoded_username) - 1] = 0;
  xbuf_clear(&decoded);
  jsn_totext(&decoded, password, 0);
  char *decoded_password = malloc(decoded.len);
  xbuf_pull(&decoded, decoded_password, decoded.len);
  decoded_password++;
  decoded_password[strlen(decoded_password) - 1] = 0;

  char *uname = "admin";
  char *pword = "wi404";

  if(strcmp(decoded_username, uname) == 0) {
    if(strcmp(decoded_password, pword) == 0) {
      uuid_t guid;
      uuid_generate(guid);
      char guid_chr[255];
      uuid_unparse(guid, guid_chr);
      xbuf_xcat(response, "{\"identifier\": {\"id\": 1}}",
                decoded_username,
                decoded_password,
                guid_chr);

      return 200;
    }

  }

  xbuf_xcat(response,
           "{\"error\": {\"id\": 0, \"username\": \"%s\", \"password\": \"\"}}",
            decoded_username);

  return 401;
}
