// @generated by protoc-gen-connect-es v0.10.1 with parameter "target=ts"
// @generated from file v1/task.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetTaskRequest, Task } from "./task_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service TaskService
 */
export const TaskService = {
  typeName: "TaskService",
  methods: {
    /**
     * @generated from rpc TaskService.getTask
     */
    getTask: {
      name: "getTask",
      I: GetTaskRequest,
      O: Task,
      kind: MethodKind.Unary,
    },
  }
} as const;
