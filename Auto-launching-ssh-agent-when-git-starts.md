If you want your passphrase to be 'remembered' for a session (or configurable timeout period) you will need to setup an ssh-agent process to handle this key.  Github provides excellent instructions for this here: https://help.github.com/articles/working-with-ssh-key-passphrases/#auto-launching-ssh-agent-on-msysgit

**However**  if you follow these instructions you will be unable to install git for windows 2.x (it will hang waiting for the ssh-add.exe process to be killed.)

To avoid this issue, if you use the following script (based on that provided above) you will be able to install and upgrade git for windows 2.x

    # Note: ~/.ssh/environment should not be used, as it
    #       already has a different purpose in SSH.
    
    env=~/.ssh/agent.env
    
    # Note: Don't bother checking SSH_AGENT_PID. It's not used
    #       by SSH itself, and it might even be incorrect
    #       (for example, when using agent-forwarding over SSH).
    
    agent_is_running() {
        if [ "$SSH_AUTH_SOCK" ]; then
            # ssh-add returns:
            #   0 = agent running, has keys
            #   1 = agent running, no keys
            #   2 = agent not running
            ssh-add -l >/dev/null 2>&1 || [ $? -eq 1 ]
        else
            false
        fi
    }
    
    agent_has_keys() {
        ssh-add -l >/dev/null 2>&1
    }
    
    agent_load_env() {
        . "$env" >/dev/null
    }
    
    agent_start() {
        (umask 077; ssh-agent >"$env")
        . "$env" >/dev/null
    }
    
    # We only want to fire up ssh-agent when in an interactive session.
    case "$-" in
    *i*)
      if ! agent_is_running; then
          agent_load_env
      fi
    
      # if your keys are not stored in ~/.ssh/id_rsa or ~/.ssh/id_dsa, you'll need
      # to paste the proper path after ssh-add
      if ! agent_is_running; then
          agent_start
          ssh-add
      elif ! agent_has_keys; then
          ssh-add
      fi
    
      unset env
    ;;
    esac

