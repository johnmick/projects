import re
import discord
import asyncio
import nltk

from collections  import Counter, defaultdict
from datetime     import datetime
from ignore_words import ignore_words, punc_set

url_pattern = r'http\S+'

token                = 'MzMwMDEwMDMyMjIzNjgyNTYx.DDaxTg.Hyz3irhrv0FF49QKNsSZOzAdSdQ'
channels             = {}
user_config          = defaultdict(dict)
user_counts          = defaultdict(lambda: defaultdict(Counter))
last_report_time     = None
report_min_frequency = 5    # seconds
num_most_common      = 20
time_tracked         = 0

def print_frequency_report():
  report_msg = "```Word Frequency Report From the Past %d Seconds```" % time_tracked
  for user in user_counts:
    report_msg += "```User: %s```" % user

    report_msg += "```"

    unique_noun_count = len(user_counts[user]["nouns"].keys())
    total_noun_count  = sum(user_counts[user]["nouns"].values())
    report_msg  += "%d unique nouns used a total of %d times:\n" % (unique_noun_count, total_noun_count)
    for item in user_counts[user]["nouns"].most_common(num_most_common):
      word = item[0]
      freq = item[1] 
      report_msg += '  "%s" used %d times\n' % (word, freq)

    unique_adj_count = len(user_counts[user]["adjectives"].keys())
    total_adj_count  = sum(user_counts[user]["adjectives"].values())
    report_msg  += "\n%d unique adjectives used a total of %d times:\n" % (unique_adj_count, total_adj_count)
    for item in user_counts[user]["adjectives"].most_common(num_most_common):
      word = item[0]
      freq = item[1] 
      report_msg += '  "%s" used %d times\n' % (word, freq)

    unique_other_count = len(user_counts[user]["other"].keys())
    total_other_count  = sum(user_counts[user]["other"].values())
    report_msg  += "\n%d unique unclassified words used a total of %d times:\n" % (unique_other_count, total_other_count)
    for item in user_counts[user]["other"].most_common(num_most_common):
      word = item[0]
      freq = item[1] 
      report_msg += '  "%s" used %d times\n' % (word, freq)

    report_msg += "```"

  return report_msg

client = discord.Client()

@client.event
async def on_ready():
  print('Logged in as')
  print(client.user.name)
  print(client.user.id)
  print('------')
  for channel in client.get_all_channels():
    if channel.type == discord.ChannelType.text:
      channels[channel.name] = channel
  print(channels)
        
@client.event
async def on_message(message):
  global last_report_time
  global time_tracked

  if client.user.name == message.author.name:
    return

  if type(message.channel) is discord.channel.PrivateChannel:
    return

  message_txt = message.content
  message_txt = re.sub(url_pattern, '', message_txt, flags=re.MULTILINE)

  if len(message_txt.strip()) == 0:
    return


  nouns      = []
  adjectives = []
  other      = []
  tags       = nltk.pos_tag(nltk.word_tokenize(message_txt.lower()))
  for item in tags:
    if item[1][0] == "N":
      nouns.append(item[0])
    elif item[1][0] == "J":
      adjectives.append(item[0])
    else:
      other.append(item[0])
  for i in range(len(other) - 1, -1, -1):
    if other[i] in ignore_words:
      other.pop(i)

  for i in range(len(other)-1,-1,-1):
    other[i] = ''.join(ch for ch in other[i] if ch not in punc_set)



  user_counts[message.author.name]["nouns"]      += Counter(nouns)
  user_counts[message.author.name]["adjectives"] += Counter(adjectives)
  user_counts[message.author.name]["other"]      += Counter(other)


  if last_report_time == None:
    print("Setting last report time")
    last_report_time = datetime.now()
  elif (datetime.now() - last_report_time).seconds >= report_min_frequency:
    time_tracked    += (datetime.now() - last_report_time).seconds 
    report_msg       = print_frequency_report()
    last_report_time = datetime.now()
    tmp = await client.send_message(channels["ganmen"], report_msg)
client.run(token)
