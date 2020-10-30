import { ConvoLinkService } from './convoLink.service';
import { UseGuards } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/guards/auth.guard";



@Resolver()
@UseGuards(AuthGuard)
export class ConvoLinkResolver {
    constructor (
        private convoLinkService: ConvoLinkService
    ) {}
}