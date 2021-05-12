import charm_tools
import json
import glob
import os
import tempfile
from google.cloud import storage

storage_client = storage.Client()

def charm_capture(request):
  # preflight request時
  cors_origin = 'https://charmcapture.com'
  if request.remote_addr == '169.254.8.129':
    cors_origin = '*'
  if request.method == 'OPTIONS':
    headers = {
      'Access-Control-Allow-Origin': cors_origin,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600',
      'Vary': 'Origin',
    }
    return ('', 204, headers)

  files = request.get_json()['data']

  bucket = storage_client.bucket('charmcapture.appspot.com')

  result = []
  for path in files:
    blob = bucket.blob('work/' + path)
    if blob.exists():
      if path.startswith('box'):
        type = 'box'
      else:
        type = 'renkin'

      _, temp_local_filename = tempfile.mkstemp()

      blob.download_to_filename(temp_local_filename)

      frames = charm_tools.video2frame(temp_local_filename, 0.9, type)

      for frame in frames:
        info = charm_tools.get_charm_info(frame, type)
        result.append(info)
      
      os.remove(temp_local_filename)
      blob.delete()
  
  headers = {
    'Access-Control-Allow-Origin': cors_origin,
    'Content-Type': 'application/json',
    'Vary': 'Origin',
  }
  result = {
    'data': result
  }
  return (json.dumps(result), 200, headers)
  