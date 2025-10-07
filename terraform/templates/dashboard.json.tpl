{
  "widgets": [
    {
      "type": "metric",
      "x": 0,
      "y": 0,
      "width": 12,
      "height": 6,
      "properties": {
        "title": "CPU Utilization",
        "metrics": [
          [ "AWS/EC2", "CPUUtilization", "InstanceId", "${instance_id}" ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "${region}"
      }
    },
    {
      "type": "metric",
      "x": 0,
      "y": 6,
      "width": 12,
      "height": 6,
      "properties": {
        "title": "Memory Usage (%)",
        "metrics": [
          [ "CWAgent", "mem_used_percent", "InstanceId", "${instance_id}" ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "${region}"
      }
    },
    {
      "type": "metric",
      "x": 0,
      "y": 12,
      "width": 12,
      "height": 6,
      "properties": {
        "title": "Disk Usage (%)",
        "metrics": [
          [ "CWAgent", "disk_used_percent", "InstanceId", "${instance_id}", "path", "/" ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "${region}"
      }
    },
    {
      "type": "metric",
      "x": 0,
      "y": 18,
      "width": 12,
      "height": 6,
      "properties": {
        "title": "Node.js Process (server.js) Running",
        "metrics": [
          [ "CWAgent", "procstat_pid_count", "process_name", "server.js", "InstanceId", "${instance_id}" ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "${region}"
      }
    }
  ]
}
