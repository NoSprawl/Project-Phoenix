#include "gwan.h"
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

int main(int argc, char *argv[]) {
  uint8_t header[] = "Content-type: application/json\r\n";
  uint8_t *callback = 0;
  uint8_t *username = 0;
  uint8_t *password = 0;
  
  http_header(1, header, sizeof(header) - 1, argv);

  get_arg("callback=", &username, argc, argv);
  get_arg("username=", &username, argc, argv);
  get_arg("password=", &password, argc, argv);

  if(strcmp(username, "mkeen") == 0) {
    if(strcmp(password, "sega1") == 0) {
      xbuf_xcat(get_reply(argv), callback);
      xbuf_xcat(get_reply(argv), "(");
      xbuf_xcat(get_reply(argv), "{token: '123'}");
      xbuf_xcat(get_reply(argv), ");");
    } else {
      xbuf_xcat(get_reply(argv), callback);
      xbuf_xcat(get_reply(argv), "(");
      xbuf_xcat(get_reply(argv), "{error: 'login failed'}");
      xbuf_xcat(get_reply(argv), ");");
    }

  } else {
    xbuf_xcat(get_reply(argv), callback);
    xbuf_xcat(get_reply(argv), "(");
    xbuf_xcat(get_reply(argv), "{error: 'login failed'}");
    xbuf_xcat(get_reply(argv), ");");
  }

  return 200;
}
