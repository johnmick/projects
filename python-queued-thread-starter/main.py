import threading
import signal
from Queue import Queue

# CONFIGURATION ################################################################
THREAD_A_CONFIG = {
	"out_queue": Queue()
}

THREAD_B_CONFIG = {
	"in_queue":  THREAD_A_CONFIG["out_queue"]
	"out_queue": Queue()
}

THREAD_C_CONFIG = {
	"in_queue": THREAD_B_CONFIG["out_queue"]
}
################################################################################

# THREAD A #####################################################################
class ThreadA(threading.Thread):
  def __init__(self, out_queue):
    threading.Thread.__init__(self)

    self.out_queue = out_queue
    self.running   = True

  def stop(self):
    self.running = False

  def run(self):
		while self.running:
			# self.out_queue.put(None)
			pass
    print("Shutdown Thread A")

thread_a = ThreadA(**THREAD_A_CONFIG)
thread_a.start()
################################################################################

# THREAD B #####################################################################
class ThreadB(threading.Thread):
  def __init__(self, in_queue, out_queue):
    threading.Thread.__init__(self)

    self.in_queue  = in_queue
    self.out_queue = out_queue
    self.running   = True

  def stop(self):
    self.running = False

  def do_work(self):
		msg = self.in_queue.get()

		self.out_queue.put(msg)

  def run(self):
    while self.running:
      self.do_work()
    while not self.in_queue.empty():
      self.do_work()
    print("Shutdown Thread B")

thread_b = ThreadB(**THREAD_B_CONFIG)
thread_b.start()
################################################################################

# Output Thread ################################################################
class ThreadC(threading.Thread):
  def __init__(self, in_queue)
    threading.Thread.__init__(self)

    self.in_queue = in_queue
    self.running  = True

  def stop(self):
    self.running = False

  def do_work(self):
		msg = self.in_queue.get()

  def run(self):
    while self.running:
      self.do_work()

    while not self.in_queue.empty():
      self.do_work()
    print("Shutdown Thread C")

thread_c = ThreadC(**THREAD_C_CONFIG)
thread_c.start()
################################################################################


# Run until user initiates shutdown request ####################################
def signal_handler(signal, frame):
  thread_a.stop()
  thread_b.stop()
  thread_c.stop()
signal.signal(signal.SIGINT, signal_handler)
signal.pause()
################################################################################
